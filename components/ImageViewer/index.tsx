import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styled, { css } from 'styled-components';

interface Props {
  src: string[];
  currentIndex?: number;
  onClose: () => void;
}

interface State {
  currentIndex: number;
}

const Modal = styled.div`
  z-index: 3;
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalContent = styled.div`
  margin: auto;
  padding: 0;
  width: 90%;
  height: 100%;
  max-height: 100%;
  text-align: center;
`;

const Slide = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-height: 100%;
    max-width: 100%;
    user-select: none;
    object-fit: contain;
  }
`;

const Close = styled.span`
  color: white;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 40px;
  font-weight: bold;
  opacity: 0.2;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const MoveButton = css`
  height: 80%;
  color: white;
  cursor: pointer;
  position: absolute;
  font-size: 60px;
  line-height: 60px;
  font-weight: bold;
  display: flex;
  align-items: center;
  opacity: 0.2;
  padding: 0 15px;
  user-select: none;

  &:hover {
    opacity: 1;
  }
`;

const Previous = styled.span`
  ${MoveButton}
  left: 0;
`;

const Next = styled.span`
  ${MoveButton}
  right: 0;
`;
export default class ImageViewer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.callOnClose = this.callOnClose.bind(this);

    document.addEventListener('keydown', this.handleKeyDown);

    this.state = {
      currentIndex:
        this.props.currentIndex === undefined ? 0 : this.props.currentIndex,
    };
  }

  public componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  private changeImage(direction: number) {
    let nextIndex = this.state.currentIndex + direction;

    if (nextIndex > this.props.src.length - 1) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = this.props.src.length - 1;
    }

    this.setState({
      currentIndex: nextIndex,
    });
  }

  private callOnClose() {
    if (this.props.onClose !== undefined) {
      this.props.onClose();
    }
  }

  private handleKeyDown(event: KeyboardEvent | React.KeyboardEvent) {
    if (event.key === 'Escape') {
      this.callOnClose();
    }

    if (['ArrowLeft', 'h'].includes(event.key)) {
      this.changeImage(-1);
    }

    if (['ArrowRight', 'l'].includes(event.key)) {
      this.changeImage(1);
    }
  }

  public render() {
    const { src } = this.props;
    const { currentIndex } = this.state;

    return (
      <Modal id='ImageViewer' onKeyDown={this.handleKeyDown}>
        <Close onClick={this.callOnClose}>&times;</Close>

        <Previous onClick={() => this.changeImage(-1)}>&#10094;</Previous>

        <Next onClick={() => this.changeImage(1)}>&#10095;</Next>

        <ModalContent className='modal-content' onClick={this.callOnClose}>
          <Slide>
            <LazyLoadImage src={src[currentIndex]} alt='' />
          </Slide>
        </ModalContent>
      </Modal>
    );
  }
}
