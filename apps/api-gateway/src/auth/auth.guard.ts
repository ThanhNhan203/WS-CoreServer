import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {}

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {}