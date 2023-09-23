import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
      .setTitle("Test Task").setDescription("LofySoft test task")
      .setVersion("1.0.0").addTag("Results").build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/lofysoft", app, document)

  await app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server started on PORT = ${process.env.PORT || 3000}`)
  });
}
bootstrap();
