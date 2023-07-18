import {
  Badge,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react'
import { Edit2Icon, EyeIcon, Trash2Icon } from 'lucide-react'
import { useContext } from 'react'
import { NotesContext } from '../context/NotesContext'
import { NoteModalContext } from '../context/NoteModalContext'

function Note({ note }) {
  const { deleteNote } = useContext(NotesContext)
  const { openModalForUpdate } = useContext(NoteModalContext)
  const imgSrc =
    note.coverImage.length < 1
      ? '/Notes.png'
      : 'http://172.20.3.46:1998/' + note.coverImage
  return (
    <Card variant='outline'>
      <CardHeader position='relative'>
        <Image
          h='200px'
          w='full'
          objectFit='cover'
          objectPosition='top'
          src={imgSrc}
        />
        <Badge colorScheme='teal' position='absolute' top='6' right='6'>
          {new Intl.DateTimeFormat('ru-RU').format(new Date(note.created_at))}
        </Badge>
      </CardHeader>
      <CardBody>
        <Heading
          fontSize='xl'
          as='h4'
          w='90%'
          overflow='hidden'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
        >
          {note.title}
        </Heading>
        <Text
          h={100}
          textOverflow='ellipsis'
          whiteSpace='pre-line'
          overflow='hidden'
        >
          {note.description}
        </Text>
      </CardBody>
      <CardFooter gap='2'>
        <ButtonGroup isAttached>
          <IconButton
            colorScheme='red'
            size='xs'
            onClick={() => deleteNote(note.id)}
            icon={<Trash2Icon size='16' />}
          />
          <IconButton
            colorScheme='teal'
            size='xs'
            icon={<EyeIcon size='16' />}
          />
          <IconButton
            colorScheme='blue'
            size='xs'
            onClick={() => openModalForUpdate(note)}
            icon={<Edit2Icon size='16' />}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default Note
