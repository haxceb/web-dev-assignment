import * as React from 'react'
import Card from '@mui/material/Card'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import './style.scss'

const SearchInput = ({
  placeHolder = 'Input',
  handleChange = () => {},
  handleSubmit = () => {},
  value
}) => {
  return (
    <Card className='search-input-wrapper'>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeHolder}
        onChange={e => handleChange(e)}
        onKeyDown={e => handleSubmit(e)}
        value={value}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton
        sx={{ p: '10px' }}
        aria-label='search'
        onClick={e => handleSubmit(e)}
      >
        <SearchIcon />
      </IconButton>
    </Card>
  )
}

export default SearchInput
