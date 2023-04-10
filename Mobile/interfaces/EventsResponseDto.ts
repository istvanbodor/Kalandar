import { AddressDto } from "./AddressDto"

export interface EventsResponseDto {

    id: string
    username: string
    event: string
    category: string
    startTime: string
    endTime: string
    fullDay: string
    address?: AddressDto
    
}