import Link from 'next/link'
import Image from 'next/image'
import {Text, Box, Flex, Avatar} from '@chakra-ui/react'
import {FaBed, FaBath} from 'react-icons/fa'
import {BsGridFill} from 'react-icons/bs'
import {GoVerified} from 'react-icons/go'
import millify from 'millify'
import DefaultImage from '../assets/images/house.jpg'

const Property = ({property:{coverPhoto,price,rentFrequency,rooms,title,baths,area,agency,isVerified,externalID}}) => (
    <Link href={`/property/${externalID}`} passHref>
        <Flex flexWrap='warp' justifyContent='flex-start' w='420px' p='5' paddingTop='0' cursor='pointer'>
            <Box>
                <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={260} alt='house' />
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
                <Text fontSize='lg'>
                    {title.length > 30 ? `${title.substring(0,30)}...` : title}
                </Text>
            </Box>
            {/* <Box w='full'> */}
                {/* <Flex padddingTop='2' alignItems='center' justifyContent='space-between'>
                    <Flex alignItems='flex-start'> */}
                        {/* <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
                        <Text fontWeight='bold' fontSize='lg'> AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text> */}
                    {/* </Flex>
                </Flex> */}

            {/* </Box> */}
        </Flex>
    </Link>
)

export default Property