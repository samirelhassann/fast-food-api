import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Client } from "@/core/domain/entities/Client";
import { IClientRepository } from "@/core/interfaces/repositories/IClientRepository";
import { prisma } from "@/drivers/db/prisma/config/prisma";

import { PrismaClientToDomainConverter } from "./converters/PrismaClientToDomainConverter";

export class PrismaClientRepository implements IClientRepository {
  async findById(id: string): Promise<Client | null> {
    return prisma.client
      .findUnique({
        where: {
          id,
        },
      })
      .then((client) =>
        client ? PrismaClientToDomainConverter.convert(client) : null
      );
  }

  async findByTaxVat(taxVat: string): Promise<Client | null> {
    return prisma.client
      .findUnique({
        where: {
          tax_vat: taxVat,
        },
      })
      .then((client) =>
        client ? PrismaClientToDomainConverter.convert(client) : null
      );
  }

  async findByEmail(email: string): Promise<Client | null> {
    return prisma.client
      .findUnique({
        where: {
          email,
        },
      })
      .then((client) =>
        client ? PrismaClientToDomainConverter.convert(client) : null
      );
  }

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<PaginationResponse<Client>> {
    const totalItems = await prisma.client.count();
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.client.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponse<Client>({
      data: data.map((c) => PrismaClientToDomainConverter.convert(c)),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async create(client: Client): Promise<Client> {
    return prisma.client
      .create({
        data: {
          name: client.name,
          email: client.email,
          tax_vat: client.taxVat.number,
        },
      })
      .then((c) => PrismaClientToDomainConverter.convert(c));
  }

  async update(client: Client): Promise<Client> {
    return prisma.client
      .update({
        where: {
          id: client.id.toString(),
        },
        data: {
          name: client.name,
          email: client.email,
        },
      })
      .then((c) => PrismaClientToDomainConverter.convert(c));
  }
}
