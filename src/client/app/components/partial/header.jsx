import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import M from 'materialize-css';

const links = [
  { name: 'Home', path: '/' },
  { name: 'Upload', path: '/upload' },
  { name: 'Logout', path: '/logout', external: true },
];

const NavItem = ({
  text, path, external, className,
}) => {
  if (external) {
    return <li key={text} className={className}><a href={path}>{text}</a></li>;
  }
  return <li key={text} className={className}><Link to={path}>{text}</Link></li>;
};

const renderNav = activeLink => {
  const nav = links.map(({ name, path, external }) => {
    const className = path === activeLink ? 'active' : '';
    return <NavItem key={name} className={className} text={name} path={path} external={external} />;
  });
  return nav;
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { path: window.location.pathname };
    this.instances = [];
  }

  componentWillMount() {
    this.props.history.listen(({ pathname }) => {
      this.setState({ path: pathname });
    });
  }

  componentDidMount() {
    M.Sidenav.init(this.sidenav);
  }

  render() {
    const nav = renderNav(this.state.path);
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">Logo</a>
          <a href="#!" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {nav}
          </ul>
          <ul className="sidenav" ref={sidenav => this.sidenav = sidenav} id="mobile-demo">
            {nav}
          </ul>
        </div>
      </nav>
    );
  }
}
export default withRouter(Header);
