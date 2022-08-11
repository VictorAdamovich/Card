export enum RoutePath {
  Error404 = '404',
  Profile = '/profile',
  Login = '/login',
  Register = '/register',
  ForgotPassword = '/forgotPassword',
  CheckEmail = '/checkEmail',
  CreateNewPassword = '/createNewPassword/*',
  Packs = '/packs',
  Cards = '/packs/:packId/cards',
  CardQuestion = '/packs/:packId/cards/:cardId',
}
