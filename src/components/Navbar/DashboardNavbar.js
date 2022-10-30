import React, { Component } from 'react';
class DashboardNavbar extends Component {
    state = {}

    style = {
        wrapper: {
            height: '100vh',
            width: '280px',
            padding: '15px',
            color: 'white',
            boxSizing: 'border-box'
        },
        navbar: {
            height: '100%',
            backgroundColor: 'var(--blue)',
            borderRadius: 10,
            padding: '20px',
            boxSizing: 'border-box'
        },
        headerText: {
            textAlign: 'center',
            margin: '0px',
            padding: 10
        },
    }
    render() {
        return (
            <div style={this.style.wrapper}>
                <div style={this.style.navbar}>
                    <h5 style={this.style.headerText}>MAVEKO DASHBOARD</h5>
                    <hr />
                </div>
            </div>
        );
    }
}

export default DashboardNavbar;