import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

export default class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: this.props.isOpen,
      images: this.props.images,
    };
    console.log("STATE",this.state)
  }


  async componentWillReceiveProps(nextProps) {
    console.log("nextProps",nextProps);
    await this.setState({
      isOpen: nextProps.isOpen,
      images: nextProps.images,
    })
  }

  render() {
    var { photoIndex } = this.state;
    return (
      <div>
        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.images[photoIndex]}
            nextSrc={this.state.images[(photoIndex + 1) % this.state.images.length]}
            prevSrc={this.state.images[(photoIndex + this.state.images.length - 1) % this.state.images.length]}
            onCloseRequest={() => { this.props.closeModal() }}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + this.state.images.length - 1) % this.state.images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.state.images.length,
              })
            }
          />
        )}
      </div>
    );
  }
}