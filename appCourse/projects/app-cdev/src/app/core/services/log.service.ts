export class LogService {
  constructor() {}

  log(message: string) {
    console.log(
      `%c ${message} `,
      'background: red; color: white;font-size:20px'
    );
  }
}
