import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateAddressDto {
    @IsString({message: "O endereço deve ser uma string"})
    @ApiProperty({
        example: "Rua das Flores, 100. Bairro: Floresta. Cidade: Belo Horizonte."
    })
    readonly address: string;

    @IsString({message:"O cep deve ser uma string"})
    @ApiProperty({
        example: "12345-000"
    })
    readonly cep: string;
}