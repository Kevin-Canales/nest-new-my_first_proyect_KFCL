import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '..//prisma/prisma.service'; // AGREGADO

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {} // AGREGADO Y MODIFICADO

 create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
}

  findAll() {
    return this.prisma.user.findMany(); // MODIFICADO PARA USAR PRISMA
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }


 
update(id: number, updateUserDto: UpdateUserDto) {
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