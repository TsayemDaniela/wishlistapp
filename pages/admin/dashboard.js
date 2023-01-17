import * as React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Layout from "../../components/Layout";
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import ManageItemsView from '../../components/dashboard/items/ManageItemsView';
import Toolbar from '@mui/material/Toolbar';
import { UserRole } from "../../models/UserRole";
import WishItem from '../../models/WishItem';
import dbConnect from '../../utils/dbConnect';
import { useRouter } from 'next/router';
import { useUser } from "../../lib/hooks";

const drawerWidth = 240;

function AdminDashboard({ window, wishitems }) {
    const admin = useUser({ role: UserRole.ADMIN, fallbackRedirect: "/", redirectIfNotFound: true });
    let allowed = false;
    const router = useRouter()
    React.useEffect(() => {
        if (!admin) {
            router.push('/admin/login');
        }
        else if (admin.role === UserRole.USER) {
            router.push('/');
        }
    }, [router, admin])

    const [component, setComponent] = React.useState("")

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
        setComponent("Items")
    }, [])

    const redirectHome = () => { window.location.href = '/'; }

    const renderViewComponent = (currentComponent) => {
        switch (currentComponent) {
            case "Items":
                return (
                    <ManageItemsView wishitems={wishitems} admin={admin} />
                )
            case "Account":
                return (
                    <>
                        <h1>Starred Screen!</h1>
                    </>
                )

            default:
                break;
        }
    }

    const drawer = (
        <div>
            <Toolbar >
                <Link href="/" className="text-center">Home</Link>
            </Toolbar>
            <Divider />
            <List>
                {['Items', 'Account'].map((text, index) => (
                    <ListItem key={text} disablePadding onClick={() => setComponent(text)}>
                        <ListItemButton selected={component === text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}    {/* switch here for icon types */}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {admin && admin.role === UserRole.ADMIN && (
                <Layout displayNav={false} displayFooter={false}>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        <Box
                            position="relative"
                            component="nav"
                            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                            aria-label="menu options"
                        >
                            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                            <Drawer
                                container={container}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                                }}
                            >
                                {drawer}
                            </Drawer>
                            <Drawer
                                variant="permanent"
                                sx={{
                                    display: { xs: 'none', sm: 'block' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                                }}
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Box>
                        <Box
                            component="main"
                            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                        >
                            <Toolbar />
                            {renderViewComponent(component)}
                        </Box>
                    </Box>
                </Layout>
            )
            }
        </>
    );
}


export default AdminDashboard;


/* Retrieves items data from mongodb database */
export async function getServerSideProps() {
    await dbConnect();

    /* find all the data in our database */
    const result = await WishItem.find({});
    const wishitems = result.map((doc) => {
        const wishitem = doc.toObject();
        wishitem._id = wishitem._id.toString();
        return wishitem;
    });

    return { props: { wishitems } };
}