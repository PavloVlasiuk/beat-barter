import { TypeOptions, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export class ToastErrorHandler {
  handle(msg: string, type: TypeOptions) {
    toast(msg, { type, theme: 'colored'});
  }
}

export default new ToastErrorHandler();
