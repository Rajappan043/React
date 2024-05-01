declare namespace login {
    export interface ProcessEnv {
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD?: string;
      DB_NAME: string;
      SECRETE: string;
      MAIL_USERNAME: string;
      MAIL_PASSWORD: string;
    }
  }
