import BaseController from '../config/controller';

class WelcomeController extends BaseController {
  public get() {
    this.response.send({ msg: 'welcome to server, redirect to /graphql' });
  }
}
export default WelcomeController;
