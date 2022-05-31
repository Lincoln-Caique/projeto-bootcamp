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
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
let AuthenticateUserService = class AuthenticateUserService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user) {
                throw new AppError('Incorrect email/password combination.', 401);
            }
            //user.password - Senha criptografada
            // password - Senha não-criptografada
            const passwordMatched = yield compare(password, user.password);
            if (!passwordMatched) {
                throw new AppError('Incorrect email/password combination.', 401);
            }
            //Usuário autenticado
            const { secret, expiresIn } = authConfig.jwt;
            const token = sign({}, secret, {
                subject: user.id,
                expiresIn,
            });
            return {
                user,
                token,
            };
        });
    }
};
AuthenticateUserService = __decorate([
    injectable(),
    __param(0, inject('UsersRepository'))
], AuthenticateUserService);
export default AuthenticateUserService;
