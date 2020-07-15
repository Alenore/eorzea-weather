import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LanguageIcon from '@material-ui/icons/Language';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import AppDrawer from './AppDrawer';
import EorzeaClock from './EorzeaClock';

const AVAILABLE_LOCALES = {
  en: 'English',
  ja: '日本語',
};

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      color: 'inherit',
      textDecoration: 'none',
      [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(2),
      },
    },
    flex: {
      flex: 1,
    },
  }),
);

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const intl = useIntl();
  const router = useRouter();
  const classes = useStyles();

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLanguageIconClick = useCallback(({ currentTarget }) => {
    setAnchorEl(currentTarget);
  }, []);

  const handleMenuIconClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const isHome = router.pathname === '/[locale]';

  return (
    <>
      <AppBar
        className={classes.appBar}
        elevation={isHome ? 0 : 4}
        position="fixed"
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleMenuIconClick}>
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.flex}
            color="inherit"
            noWrap
            variant="h6"
          >
            {!isHome && (
              <Link as={`/${intl.locale}`} href="/[locale]">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={classes.title}>Eorzea Weather</a>
              </Link>
            )}
          </Typography>
          {router.asPath.startsWith(`/${intl.locale}`) && (
            <>
              <IconButton color="inherit" onClick={handleLanguageIconClick}>
                <LanguageIcon />
              </IconButton>
              <Menu
                MenuListProps={{
                  component: 'div',
                }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  horizontal: 'right',
                  vertical: 'top',
                }}
                onClose={handleMenuClose}
                open={!!anchorEl}
                transformOrigin={{
                  horizontal: 'right',
                  vertical: 'top',
                }}
              >
                {Object.entries(AVAILABLE_LOCALES).map(([locale, label]) => (
                  <MenuItem
                    component="a"
                    href={`/${locale}${router.asPath.replace(/^\/[^/]+/, '')}`}
                    hrefLang={locale}
                    key={`item-${locale}`}
                    lang={locale}
                    onClick={handleMenuClose}
                    selected={intl.locale === locale}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
          <EorzeaClock />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <AppDrawer onClose={handleDrawerClose} open={open} />
    </>
  );
};

export default AppHeader;
