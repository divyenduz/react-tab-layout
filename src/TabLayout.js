import React from 'react';
import './TabLayout.css';

export default class SwipeViews extends React.Component {

  measure(children_length, selectedIndex) {
    this.setState({
      pageWidthPercent: 100 / children_length,
      translation: selectedIndex * pageWidthPercent
    });
  }

  constructor(props) {
    super(props);
    const selectedIndex = this.props.selectedIndex || 0;
    const pageWidthPercent = 100 / this.props.children.length;
    const translation = selectedIndex * pageWidthPercent;
    this.state = {
      children_length: this.props.children.length,
      selectedIndex,
      pageWidthPercent,
      translation,
      clientX: null,
      animate: true,
      pageWidth: window.innerWidth,
    };
  }

  componentDidMount() {
    this._selectIndex();
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.children_length !== nextProps.children.length){
      this.setState({
        children_length: nextProps.children.length,
        pageWidthPercent: 100 / nextProps.children.length
      });
    }
    this._selectIndex(parseInt(nextProps.selectedIndex, 10));
  }

  render() {
    const swipeViewsInkStyle = {
      width: this.state.pageWidthPercent + '%',
      marginLeft: this.state.translation + '%',
      transitionProperty: this.state.animate ? 'all' : 'none',
    };
    const swipeViewsStyle = {
      transform: 'isInte(-' + this.state.translation + '%)',
      WebkitTransform: 'translateX(-' + this.state.translation + '%)',
      transitionProperty: this.state.animate ? 'all' : 'none',
      WebkitTransitionProperty: this.state.animate ? 'all' : 'none',
      width: this.state.children_length * 100 + '%',
    };

    return (
      <div className="SwipeViewsContainer">
        <header className="SwipeViewsHeader">
          <div className="SwipeViewsTabs">
            <ul>
              {this.props.children.map((child, index) => {
                const className = (index === this.state.selectedIndex ? 'active' : '');
                return (
                  <li
                    key={index}
                    className={'SwipeViewsTab ' + className}
                    onClick={this._handleClick.bind(this, index)}
                  >
                    {child.props.title}
                  </li>
                );
              })}
            </ul>
            <div className="SwipeViewsInk" style={swipeViewsInkStyle} />
          </div>
        </header>
        <div
          className="SwipeViews"
          style={swipeViewsStyle}
        >
          {this.props.children.map((child, index) => {
            return (
              <div
                className="SwipeView"
                key={index}
                style={{width: this.state.pageWidthPercent + '%'}}
              >
                {child.props.children}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  isInteger (value){
    return typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value;
  }

  _selectIndex(selectedIndex) {
    if (this.isInteger(selectedIndex)) {

      var pageWidthPercent = 100 / this.state.children_length;
      const translation = selectedIndex * pageWidthPercent;

      return this.setState({
        selectedIndex,
        translation,
        clientX: null,
        animate: true,
      });
    }
    if (!this.context.router) {
      return null;
    }
    this.props.children.map((child, index) => {
      const to = child.props.title.props.to;
      const isActive = this.context.router.isActive(to);
      if (isActive) {

        var pageWidthPercent = 100 / this.state.children_length;
        const translation = selectedIndex * pageWidthPercent;

        return this.setState({
          selectedIndex: index,
          translation,
          clientX: null,
          animate: true,
        });
      }
    });
  }

  _transitionTo(selectedIndex) {
    if (this.props.onIndexChange) {
      this.props.onIndexChange(selectedIndex);
    }
    if (!this.context.router) {
      return null;
    }
    const child = this.props.children[selectedIndex];
    const to = child.props.title.props.to;
    if (!this.context.router.isActive(to)) {
      this.context.router.transitionTo(to);
    }
  }

  _handleClick(selectedIndex, event) {

    const pageWidthPercent = 100 / this.state.children_length;
    const translation = selectedIndex * pageWidthPercent;

    this.setState({
      selectedIndex,
      translation,
      clientX: null,
      animate: true,
    });
    if (event.target.localName === 'li') {
      this._transitionTo(selectedIndex);
    }
  }
}

SwipeViews.contextTypes = {
  router: React.PropTypes.func,
};

SwipeViews.propTypes = {
  children: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  onIndexChange: React.PropTypes.func,
};
