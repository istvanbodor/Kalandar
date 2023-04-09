import { AddressDto } from "./AddressDto";

export interface AddEventDto{
    address?:AddressDto
    event: string
    category: string

}