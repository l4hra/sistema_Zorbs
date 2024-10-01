import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/HomeRounded";
import DashboarIcon from "@mui/icons-material/DashboardRounded";
import ComandaIcon from "@mui/icons-material/PointOfSaleRounded";
import CashIcon from "@mui/icons-material/CurrencyExchangeRounded";
import RelatorioIcon from "@mui/icons-material/AssessmentRounded";
import ProductIcon from '@mui/icons-material/ProductionQuantityLimitsRounded';
import { useNavigate } from "react-router-dom";
import { useAppStore } from '../appStore';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function Sidenav() {
  const theme = useTheme();
  //const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const updateOpen = useAppStore((state) => state.updateOpen)
  const open = useAppStore((state) => state.dopen)

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box height={30} />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ background: "#136b69", height: 100 + 'vh', color: "#fff" }}>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("/") }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: "initial",
                  }
                  : {
                    justifyContent: "center",
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  { minWidth: 0, justifyContent: "center" },
                  open ? { mr: 3 } : { mr: "auto" },
                ]}
              >
                <HomeIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={[open ? { opacity: 1 } : { opacity: 0 }]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("/Dashboard") }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: "initial",
                  }
                  : {
                    justifyContent: "center",
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: "auto",
                    },
                ]}
              >
                <DashboarIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={[
                  open
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: "initial",
                  }
                  : {
                    justifyContent: "center",
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: "auto",
                    },
                ]}
              >
                <ComandaIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary="Comandas"
                sx={[
                  open
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }} onClick={() => { navigate("/Produtos") }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: "initial",
                  }
                  : {
                    justifyContent: "center",
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: "auto",
                    },
                ]}
              >
                <ProductIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary="Produtos"
                sx={[
                  open
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: "initial",
                  }
                  : {
                    justifyContent: "center",
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: "auto",
                    },
                ]}
              >
                <CashIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary="Cash"
                sx={[
                  open
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={[
                {
                  minHeight: 48,
                  px: 2.5,
                },
                open
                  ? {
                    justifyContent: "initial",
                  }
                  : {
                    justifyContent: "center",
                  },
              ]}
            >
              <ListItemIcon
                sx={[
                  {
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                      mr: 3,
                    }
                    : {
                      mr: "auto",
                    },
                ]}
              >
                <RelatorioIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText
                primary="Relatórios"
                sx={[
                  open
                    ? {
                      opacity: 1,
                    }
                    : {
                      opacity: 0,
                    },
                ]}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
