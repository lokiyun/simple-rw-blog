import { motion } from 'framer-motion'
import styled from 'styled-components'

export const PopupContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.text};
  width: 30rem;
  padding: 0 2rem;
  border-radius: 2rem;
`

export const PopupHeader = styled.div`
  text-align: center;
  height: 3rem;
  line-height: 3rem;
`

export const PopupForm = styled.div`
  display: flex;
  flex-direction: column;
`

export const FormItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`

export const FormLabel = styled.label`
  width: 4rem;
`

export const FormInput = styled.input`
  width: calc(100% - 4rem);
  border: 1px solid transparent;
  outline: none;
  padding: 0.4rem 0.4rem;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
`

export const FormButton = styled.button<{ bgColor: string }>`
  width: 8rem;
  height: 3rem;
  opacity: 1;
  border: none;
  outline: none;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.theme.text};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
