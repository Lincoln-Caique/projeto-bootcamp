export default interface IStarageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}

