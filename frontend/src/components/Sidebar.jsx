import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/authContext';
import AbsenceFunc from '../pages/absenceFunc';
import AllEmployees from '../pages/allEmployees';
import CustomReport from '../pages/customReport';
import EmployeeByDept from '../pages/employeeByDept';
import EmployeeReports from '../pages/employeeReports';
import Leaves from '../pages/leaves';
import LeavesByDept from '../pages/leavesByDept';
import NewEmployee from '../pages/newEmpoyee';
import Profile from '../pages/profile';
import Subordinates from '../pages/subordinates';
import NotificationBell from './notifications';
import { SidebarData } from './sidebarData';
import SubMenu from './subMenu';

const Nav = styled.div`
    background: #333;
    height: 80px;
    width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    top: 0;
`;

const Content = styled.div`
    transition: margin-left 350ms;
    margin-left: ${({ $sidebar }) => ($sidebar ? '300px' : '0')};
    margin-top: 80px; /* Add this line to create space below the fixed nav bar */
    height: calc(100vh - 80px); /* Adjust the height to fill the remaining space */
    overflow-y: auto; /* Add this line to enable scrolling if content overflows */
`;


const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: #333;
    width: 300px;
    height: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ $sidebar }) => ($sidebar ? '0' : '-300px')}; /* Adjust the value based on your sidebar width */
    transition: 350ms;
    z-index: 10;
    border-right: 1px solid #ccc; /* Add border style here */
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);     // This is the function that will be called when the sidebar is clicked

    return (
        <React.Fragment>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav>
                    <NavIcon to='#'>
                        {sidebar ? <AiOutlineClose onClick={showSidebar} /> : <FaBars onClick={showSidebar} />}
                    </NavIcon>
                    <div style={{marginLeft: 'auto', marginRight: '2rem'}}>
                        <NotificationBell/> {/* need to pass notifications by props */}
                    </div>
                </Nav>

                <SidebarNav $sidebar={sidebar}>
                    <SidebarWrap>
                        <NavIcon to='#'>
                            <AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {SidebarData.map((item, index) => {
                            return <SubMenu item={item} key={index}/>;
                        })}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>

            <Content $sidebar={sidebar} onClick={()=>setSidebar(false)}>
                <Routes>
                    {/* Routes of the Navigation Sidebar */}

                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/reports/employees-by-dept' element={<EmployeeByDept/>} />
                    <Route path='/reports/leaves-by-dept' element={<LeavesByDept/>} />
                    <Route path='/reports/employee-reports' element={<EmployeeReports/>} />
                    <Route path='/reports/custom-report' element={<CustomReport/>} />

                    <Route path='/employee-details/view-subordinates' element={<Subordinates/>} />
                    <Route path='/employee-details/view-all-employees' element={<AllEmployees/>} />
                    <Route path='/employee-details/add-new-employee' element={<NewEmployee/>} />

                    <Route path='/abs-func' element={<AbsenceFunc/>} />
                    <Route path='/leaves' element={<Leaves/>} />
                    <Route path="/logout" element={<Logout />} />

                    <Route path="/" element={<Navigate to="/dashboard/profile"/>} />
                    <Route path="*" element={<h1>Page Not Found</h1>}/>
                </Routes>
            </Content>
        </React.Fragment>
    );
};

export default Sidebar;

const Logout = () => {
    const { logout: logoutFunc } = useContext(AuthContext);

    useEffect(() => {
        logoutFunc();
    }, [logoutFunc]);

    return <Navigate to="/login" />;
}
