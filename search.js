import {useState} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import {Flex, Box, Text, Icon} from '@chakra-ui/react'
import {BsFilter} from 'react-icons/bs'
import NoImage from '../assets/images/noresult.jpg'

import SearchFilters from '../components/SearchFilters'
import Property from '../components/Property'
import { fetchApi, baseUrl } from '../utils/fetchApi'

const Search = ({Properties}) => {
    const [searchFilters, setSearchFilters] = useState(false)
    const router = useRouter()

    return (
        <Box>
            <Flex
            cursor='pointer'
            bg='gray.100'
            borderColor='gray.200'
            borderBottom='1px'
            fontWeight='black'
            fontSize='lg'
            justifyContent='center'
            alignItems='center'
            onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text>Search Property by Filters</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter} />

            </Flex>
            {searchFilters && <SearchFilters />}
            <Text fontSize='2xl' p='4' fontWeight='bold'>
                Properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
                {Properties.map((property) => <Property property={property} key={property.id} />)}
            </Flex>
            {Properties.length === 0 && (
                <Flex justifyContent='center' alignItems='center' flexDirection='column' marginTop='5' marginBottom='5'>
                    <Image alt='no result' src={NoImage} />
                    <Text fontSize='2xl' marginTop='3' fontWeigth='bold'>No Data Found</Text>
                </Flex>
            )}
        </Box>
    )
}

export default Search

export async function getServerSideProps({query}){

    const purpose = query.purpose || 'for-rent'
    const rentFrequency = query.rentFrequency || 'yearly'
    const minPrice = query.minPrice || '0'
    const maxPrice = query.maxPrice || '1000000'
    const roomsMin = query.roomsMin || '0'
    const bathsMin = query.bathsMin || '0'
    const sort = query.sort || 'price desc'
    const areaMax = query.areaMax || '35000'
    const locationExternalIDs = query.locationExternalIDs || '5002'
    const categoryExternalIDs = query.categoryExternalIDs || '4'

    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&category=${categoryExternalIDs}&areaMax=${areaMax}&sort=${sort}&bathsMin=${bathsMin}&roomsMin=${roomsMin}&minPrice${minPrice}&maxPrice=${maxPrice}&rentFrequency=${rentFrequency}`)
      
    return {
      props:{

        Properties: data?.hits,
       }
    }
  }