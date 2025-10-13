import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '..//prisma/prisma.service'; // AGREGADO
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {} // AGREGADO Y MODIFICADO


create(createUserDto: CreateUserDto) {
  const hashedPassword = bcrypt.hashSync(createUserDto.password, 10); //Cifra la contraseña
  return this.prisma.user.create({
    data: {
      ...createUserDto,
      password: hashedPassword, // Usa la contraseña cifrada
    },
  });
}

  findAll() {
    return this.prisma.user.findMany(); // MODIFICADO PARA USAR PRISMA
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }


 
update(id: number, updateUserDto: UpdateUserDto) {
  // Si el usuario actualiza el password, lo ciframos
  if (updateUserDto.password) {
    updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
  }

  return this.prisma.user.update({
    where: { id },
    data: updateUserDto,
  });
}


remove(id: number) {
  return this.prisma.user.delete({
    where: { id },
  });
}
}