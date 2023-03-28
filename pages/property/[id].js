import {Box, Text, Avatar, Flex, Spacer} from '@chakra-ui/react'
import {FaBed, FaBath} from 'react-icons/fa'
import {BsGridFill} from 'react-icons/bs'
import {GoVerified} from 'react-icons/go'
import millify from 'millify'
import ImageScrollbar from '../../components/ImageScrollbar'

import {baseUrl, fetchApi} from '../../utils/fetchAPI'

const PropertyDetails = ({propertyDetails: {price, rooms, rentFrequency, isVerified, title, baths, area, agency, description, type, purpose, furnishingStatus,amenities, photos}}) => (
    <Box maxWidth='1000px' p='4' margin='auto'>
        {photos && <ImageScrollbar data={photos} />}
        <Box w='full' p='6'>
            <Box>
                <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
                    <Text fontWeight='bold' fontSize='lg'>AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                </Box>
                <Box>
                    <Avatar sz='sm' src={agency?.logo?.url} />
                </Box>
                <Flex alignitem='center' justifyContent='space-between' w='250px' color='blue.400' p='1'>
                   {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
                </Flex>
                <Box marginTop='2'>
                    <Text fontSize='lg' marginBottom='2' fontWeight='bold'>
                        {title}
                    </Text>
                    <Text lineHeight='2' color='gray.600'>
                        {description}
                    </Text>
                </Box>
                {/* <Flex flexWrap='wrap' justifyContent='space-between' textTransform='uppercase'> */}
                    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' padding='3' textTransform='uppercase' flexWrap='wrap'>
                        <Text>Type</Text>
                        <Text fontWeight='bold'>{type}</Text>
                        <Text>Purpose</Text>
                        <Text fontWeight='bold'>{purpose}</Text>
                        {furnishingStatus && (
                            <Flex justifyContent='space-between' w='400px'>
                                <Text>Furnishing Status</Text>
                                <Text fontWeight='bold'>{furnishingStatus}</Text>
                            </Flex>
                            )}
                            
                    </Flex>
                {/* </Flex> */}
                <Box>
                    {amenities && <Text fontWeight='black' fontSize='2xl' marginTop='5'>Amenities</Text>}
                    <Flex flexWrap='wrap'>
                        {amenities.map((item) => (
                          item.amenities.map((amenity) => (
                            <Text 
                            fontWeight='bold'
                            fontSize='l'
                            color='blue.400'
                            p='2'
                            bg='gray.200'
                            m='1'
                            borderRadius='5'
                            key={amenity.text}>{amenity.text}
                            </Text>
                          ))  
                        )
                        )}
                    </Flex>
                </Box>
            </Box>
        </Box>
   

)

export default PropertyDetails

export async function getServerSideProps({params:{id}}) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)

    return{
        props: {
            propertyDetails: data
        }
    }
}