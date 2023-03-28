import {Text, Input, Icon, Button, Flex, Spinner, Select, Box} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import Image from 'next/image'
import {MdCancel} from 'react-icons/md'

import {filterData, getFilterValues} from '../utils/filterData'


const SearchFilters = () => {
    const [filters, setFilters] = useState(filterData)
    const router = useRouter()
    console.log(router)
    
    const searchProperties = (filterValues) => {
        const path = router.pathname
        const {query} = router
         
        
        const values = getFilterValues(filterValues)
        
        values.forEach((item) => {
            if(item.value && filterValues?.[item.name]) {
              query[item.name] = item.value
            }
          })

        // values.forEach((item) => 
        //     {query[item.name] = item.value}
        // )

        router.push({pathname:path, query:query})
    }
   

    return(
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
            {filters.map((filter) => 
                <Box key={filter.queryName}>
                    <Select 
                    placeholder={filter.placeholder}
                    p='2'
                    w='fit-content'
                    onChange={(e) => searchProperties({[filter.queryName]: e.target.value})}
                    >
                        {filter?.items?.map((item) => 
                        <option value={item.value} key={item.value}>
                            {item.name}
                        </option>)
                        }

                    </Select>
                </Box>
            )}

        </Flex>
    )
}

export default SearchFilters