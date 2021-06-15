import { Button } from "@chakra-ui/button";
import { Box, Flex, Link as LinkChakra, Stack, Text } from "@chakra-ui/layout";
import { Collapse, IconButton, useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { Popover, PopoverContent, PopoverTrigger } from "@chakra-ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from 'next/link';


export default function Header() {
  const { toggleColorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure();

  const colorModeObject = {
    iconButtonToggle: useColorModeValue(
      <FontAwesomeIcon icon='moon' />,
      <FontAwesomeIcon icon='sun' color='white' />
    ),
    backgroundButtonToggle: useColorModeValue('gray.50', 'transparent'),
    backgroundHeader: useColorModeValue('white', 'gray.700'),
    colorBorderBottom: useColorModeValue('gray.100', 'gray.500'),
    colorHeader: useColorModeValue('', 'gray.100')
  }
  
  return (
    <>
      <Box as='header' d='flex' alignItems='center' 
        background={colorModeObject.backgroundHeader}
        color={colorModeObject.colorHeader}
        height='6rem' width='100%' padding={{
          base: '1rem', lg: '2rem 4rem'
        }} borderBottom='1px solid'
        borderBottomColor={colorModeObject.colorBorderBottom}

        transition='all 200ms'
      >
        <Flex mr={{ base: '0.5rem' }} display={{ base: 'flex', md: 'none' }}
          variant={'ghost'}
        >
          <IconButton onClick={onToggle} variant={'ghost'} 
            icon={
              isOpen ? <FontAwesomeIcon icon='times' /> :
              <FontAwesomeIcon icon='bars' />
            } aria-label={'Toggle Navigation'} fontSize={{
              base: '1.2rem', lg: '1.5rem'
            }}
          />
        </Flex>
        <Link href='/'>
          <LinkChakra padding='0 2rem 0 0' fontSize={{
              base: '1.2rem', lg: '1.5rem'
            }}
          >
            <FontAwesomeIcon icon='home' />
          </LinkChakra>
        </Link>
        <Flex display={{ base: 'none', md: 'flex' }} bg='transparent' 
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'} align={'center'} borderBottom={{
            base: '1px solid', md: '0px'
          }}
          borderBottomColor={colorModeObject.colorBorderBottom}
        >
          <DesktopNav />
        </Flex>

        <Button onClick={toggleColorMode} size='sm' marginLeft='auto' fontSize={{
            base: '1.1rem', lg: '1.2rem'
          }}
        >
          {colorModeObject.iconButtonToggle}
        </Button>
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </>
  )
}

const DesktopNav = () => {
  return (
    <Stack direction='row' flex='1' spacing='10' justify='space-around'>
      {NAV_ITEMS.map(item => (
        <Box key={item.label}>
          <Popover trigger='hover' placement='bottom-start'>
            <PopoverTrigger>
              <LinkChakra href={item.href ?? '#'}
                _hover={{
                  textDecoration: 'none',
                }}
              >
                <Text as='span' p={2} fontSize={'md'}
                  fontWeight={500} color={useColorModeValue('', 'gray.100')}
                  _hover={{
                    color: useColorModeValue('gray.800', 'white'),
                    filter: 'brightness(0.8)'
                  }}
                >
                  {item.label}
                </Text>
              </LinkChakra>
            </PopoverTrigger>

            {item.children && (
              <PopoverContent border={0} boxShadow={'md'}
                bg={useColorModeValue('white', 'gray.600')}
                p={4} rounded={'xl'} minW={'sm'}>
                <Stack>
                  {item.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <LinkChakra href={href} role='group' display='block' p={2}
      rounded='md' textDecoration='none'
      _hover={{
        filter: 'brightness(0.9)'
      }}
    >
      <Stack direction='row' align='center'>
        <Box as='div' >
          <Text transition={'all .3s ease'}
            _hover={{ color: 'blue.400' }}
          >
            {label}
          </Text>
          <Text fontSize={'small'} color={useColorModeValue('', 'gray.200')}>{subLabel}</Text>
        </Box>
        <Flex transition={'all 300ms ease'} transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'} align={'center'} flex={1}
        >
          <FontAwesomeIcon icon='chevron-right' />
        </Flex>
      </Stack>
    </LinkChakra>
  )
}


const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.600')}
      p={4} display={{ md: 'none' }} borderBottom='1px solid'
      borderBottomColor={useColorModeValue('gray.100', 'gray.500')}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex py={2} as={LinkChakra} href={href ?? '#'}
        justify={'space-between'} align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600} 
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <FontAwesomeIcon icon='times'/>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack mt={2} pl={4} borderLeft={1} borderStyle={'solid'}
          borderColor={useColorModeValue('gray.100', 'gray.500')}
          align={'start'}
        >
          {children && children.map((child) => (
              <LinkChakra key={child.label} py={2} href={child.href}
                color={useColorModeValue('gray.600', 'gray.200')}
              >
                {child.label}
              </LinkChakra>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};


interface NavItem {
  label: string;
  subLabel?: string;
  children?: NavItem[];
  href?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Famílias',
    href: '#',
    children: [{
      label: 'Hiragana',
      subLabel: "Hiragana's families",
      href: '/alphabet/hiragana',
    }, {
      label: 'Katakana',
      subLabel: "Hiragana's families",
      href: '/alphabet/katakana',
    }]
  }
]