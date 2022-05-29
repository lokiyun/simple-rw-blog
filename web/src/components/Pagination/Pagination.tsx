import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
`

const LeftBtn = styled.button`
  padding: 0.5rem 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  outline: none;
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;

  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  background-color: #ffffff;
  &:hover {
    opacity: 0.85;
    color: #ffffff;
    background-color: ${(props) => props.theme.primary};
  }
`

const RightBtn = styled.button`
  padding: 0.5rem 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  outline: none;
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;

  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  background-color: #ffffff;
  &:hover {
    opacity: 0.85;
    color: #ffffff;
    background-color: ${(props) => props.theme.primary};
  }
`

const NumsWrapper = styled.div``

const NumBtn = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  outline: none;
  border: none;
  margin: 0 0.5rem;
  cursor: pointer;
  color: ${(props) => (props.selected ? '#ffffff' : 'inherit')};
  background-color: ${(props) =>
    props.selected ? props.theme.primary : '#ffffff'};
  &:hover {
    opacity: 0.85;
    color: #ffffff;
    background-color: ${(props) => props.theme.primary};
  }
`

interface PaginationProps {
  count?: number
  pageSize?: number
  current: number
  onSelect?: (index: number) => void
}

const Pagination = ({
  count = 0,
  pageSize = 10,
  current = 1,
  onSelect,
}: PaginationProps) => {
  const [relPageSize, setRelPageSize] = useState<number[]>([])

  useEffect(() => {
    if (count > 0) {
      setRelPageSize(calCount(count))
    }
  }, [count])

  const calCount = (value: number) => {
    if (value == undefined) {
      return []
    }
    const r = value % 5 > 0 ? 1 : 0
    const realPageSize = Math.floor(value / pageSize) + r
    const list = []
    for (let i = 1; i <= realPageSize; i++) {
      list.push(i)
    }
    return list
  }

  const handleChangeByNums = (index: number) => {
    if (index === current) return
    onSelect(index)
  }

  const handlePrev = () => {
    if (current === 1) return
    onSelect(current - 1)
  }

  const handleNext = () => {
    if (current === relPageSize.length) return
    onSelect(current + 1)
  }

  return (
    <Container>
      <LeftBtn onClick={handlePrev}>上一页</LeftBtn>
      <NumsWrapper>
        {relPageSize.length > 0
          ? relPageSize?.map((item, index) => (
              <NumBtn
                onClick={() => handleChangeByNums(index + 1)}
                key={item}
                selected={index + 1 === current}
              >
                {item}
              </NumBtn>
            ))
          : null}
      </NumsWrapper>
      <RightBtn onClick={handleNext}>上一页</RightBtn>
    </Container>
  )
}

export default Pagination
