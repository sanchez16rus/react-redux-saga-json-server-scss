import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const routes = {
  '/': 'Home'
};

const findRouteName = url => routes[url];

const getPaths = (pathname) => {
  const paths = ['/'];

  pathname.split('/').reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);

    return currPath;
  });

  return paths;
};

const BreadcrumbsItem = ({ ...rest, url, isExact }) => {
  const routeName = findRouteName(url);
  if (routeName) {
    return (
      isExact ? 
      (
        <BreadcrumbItem active>
            {routeName}
        </BreadcrumbItem>
      )
      :
      (
        <BreadcrumbItem>
          <Link to={url || ''}>
            {routeName}
          </Link>
        </BreadcrumbItem>
      )
      
    );
  }
  return null;
};

const Breadcrumbs = ({ ...rest, location : { pathname }, match }) => {
  const paths = getPaths(pathname);
  let mass = [];
  let lenght = paths.length;

  paths.forEach( (p, index) => {
    mass.push(<BreadcrumbsItem key={index} url={p} isExact={index+1 === lenght}/>);
  });

  return (
    <Breadcrumb>
      {mass}
    </Breadcrumb>
  );
};

const MyBreadcrumb = (props) => {
  return (
    <Route path="/:path" component={Breadcrumbs} {...props} />
  );
};  

export default MyBreadcrumb;