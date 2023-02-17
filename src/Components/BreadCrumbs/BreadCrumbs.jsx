import React from 'react'
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";
import './BreadCrumbs.css'
const BreadCrumbs = () => {
    const breadcrumbs = useBreadcrumbs();
    return (
        <div>
            {breadcrumbs.map(({ breadcrumb }, index) => {
                if (index !== breadcrumbs.length - 1) {
                    if (breadcrumb.props.children !== "Details") {
                        return <><NavLink to={`/${breadcrumb.props.children.toLowerCase()}`} className='fontSize  '>{breadcrumb}<span className='mx-2'>{">"}</span></NavLink></>;
                    } else {
                        return <span className='fontSize textColor '>{breadcrumb}</span>;
                    }
                } else if (!breadcrumb.props.children.match(/[0-9]/g)) {
                    return <span className='fontSize textColor '>{breadcrumb}</span>;
                }
            })}
        </div>
    )
}

export default BreadCrumbs