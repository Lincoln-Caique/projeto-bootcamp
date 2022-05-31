import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';


import IAppontmentsRepository from '../repositories/IAppointmentsRepository';



interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type  IResponse  = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(@inject('AppontmentsRepository')
  private appointmentsRepository: IAppontmentsRepository,
  ) { }

  public async execute({provider_id, year, month, day}: IRequest): Promise<IResponse> {
    const appoitments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      year,
      month,
      day,
    })

    const hourStart = 8;

    const eachHourArray = Array.from({length: 10}, (_,index) => index + hourStart,);


    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appoitments.find(appoitment =>
        getHours(appoitment.date) === hour ,
      );

      const compareDate = new Date(year,month- 1,day, hour);


      return {
          hour,
          available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
        }
    });

    return availability;

  }

}

export default ListProviderDayAvailabilityService;
