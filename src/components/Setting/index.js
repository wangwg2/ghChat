import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  withRouter,
} from 'react-router-dom';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import './styles.scss';
import Button from '../Button';
import Modal from '../Modal';
import InitApp from '../../modules/InitApp';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // githubStars: '--',
    };
  }

  componentWillMount() {
    if (!this.props.initializedApp) {
      this._InitApp = new InitApp({ history: this.props.history });
      this._InitApp.init().then(() => {
        this.props.initApp(true);
      });
    }
  }

   _showModal = () => {
     this.setState({ visible: true });
   }

   _hideModal = () => {
     this.setState({ visible: false });
   };

   logout = () => {
     window.socket.disconnect();
     localStorage.removeItem('userInfo');
     this.props.initApp(false);
     this.props.history.push('/login');
   }

   //  componentDidMount() {
   //    axios.get('https://api.github.com/repos/aermin/react-chat').then((res) => {
   //      this.setState({ githubStars: res.data.stargazers_count });
   //    });
   //  }

  _openUrl = (url) => {
    window.open(url);
  }

  get isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  render() {
    const githubStarRender = (
      <div className="githubStarRender" onClick={() => this._openUrl('https://github.com/aermin/react-chat')}>
        <svg className="icon githubIcon" aria-hidden="true">
          <use xlinkHref="#icon-github-copy" />
        </svg>
        <span className="starTitle">
          源码 & star
        </span>
      </div>
    );

    return (
      <div className="setting">
        <Modal
          title="确定退出？"
          visible={this.state.visible}
          confirm={this.logout}
          hasCancel
          hasConfirm
          cancel={this._hideModal}
         />
        {githubStarRender}
        <div className="contact" onClick={() => this._openUrl('https://github.com/aermin/blog/issues/63')}>开启PWA(将ghChat安装到桌面)</div>
        {this.isProduction ? (
          <div>
            {/* <Link className="contact" to="/private_chat/1">联系作者</Link> */}
            <Link className="contact" to="/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e">项目交流群</Link>
          </div>
        ) : (
          <div>
            {/* <div className="contact" onClick={() => this._openUrl('https://im.aermin.top/private_chat/1')}>联系作者</div> */}
            <div className="contact" onClick={() => this._openUrl('https://im.aermin.top/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e')}>项目交流群</div>
          </div>
        )}
        <Button clickFn={this._showModal} value="退出登录" />
      </div>
    );
  }
}


Setting.propTypes = {
  initializedApp: PropTypes.bool,
  initApp: PropTypes.func,
};


Setting.defaultProps = {
  initializedApp: false,
  initApp() {},
};

export default withRouter(Setting);
