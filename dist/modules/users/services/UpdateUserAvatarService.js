var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
let UpdateUserAvatarService = class UpdateUserAvatarService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ user_id, avatarFilename }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findById(user_id);
            if (!user) {
                throw new AppError('Only authenticated users can change avatar.', 401);
            }
            if (user.avatar) {
                //Deletar avatar anterior
                const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
                const userAvatarFileExists = yield fs.promises.stat(userAvatarFilePath);
                if (userAvatarFileExists) {
                    yield fs.promises.unlink(userAvatarFilePath);
                }
            }
            user.avatar = avatarFilename;
            yield this.usersRepository.save(user);
            return user;
        });
    }
};
UpdateUserAvatarService = __decorate([
    injectable(),
    __param(0, inject('UsersRepository'))
], UpdateUserAvatarService);
export default UpdateUserAvatarService;
