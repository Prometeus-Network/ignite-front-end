import React from 'react';
import { observer } from 'mobx-react';
import { Dialog, withMobileDialog, makeStyles } from '@material-ui/core';

import { UpdatePasswordError } from './resetPassword/UpdatePasswordError';
import { CustomDialogTitle } from './CustomDialogTitle';
import { SignUp } from './SignUp';
import { CreateWallet } from './CreateWallet';
import { Attention } from './Attention';
import { Welcome } from './Welcome';
import { ErrorAuthorization } from './ErrorAuthorization';
import { CreateAccount } from './CreateAccount';
import { GenerateHash } from './GenerateHash';
import { Verify } from './Verify';
import { LoginForm } from './LoginForm';
import { CreateWalletPreload } from './CreateWalletPreload';
import { ErrorVerify } from './ErrorVerify';
import { ResetPassword } from './resetPassword/ResetPassword';
import { ForgotPassword } from './resetPassword/ForgotPassword';
import { ChangePassword } from './resetPassword/ChangePassword';
import { PasswordUpdated } from './resetPassword/PasswordUpdated';
import { PasswordUpdatedError } from './resetPassword/PasswordUpdatedError';
import { ChangePasswordWithHash } from './resetPassword/ChangePasswordWithHash';
import { ResetWithoutKey } from './resetPassword/ResetWithoutKey';
import { useLocalization, useStore } from '../../store/hooks';
import { CommunityData } from './CommunityData';

const dialogType = {
    signUp: {
        id: 'signUp',
        component: <SignUp />,
        title: 'sign-up',
        type: 'default',
    },
    createWallet: {
        id: 'createWallet',
        component: <CreateWallet />,
        title: 'sign-up.wallet-created',
        type: 'default',
    },
    createWalletPreload: {
        id: 'createWalletPreload',
        component: <CreateWalletPreload />,
        title: 'sign-up.wallet-created-preload',
        type: 'default',
    },
    communityData: {
        id: 'communityData',
        component: <CommunityData/>,
        title: 'sign-up.community-data',
        type: 'default',
    },
    attention: {
        id: 'attention',
        component: <Attention />,
        title: 'sign-up.attention',
        type: 'attention',
    },
    welcome: {
        id: 'welcome',
        component: <Welcome />,
        title: 'sign-up.welcome-to-ignite',
        type: 'default',
    },
    errorAuthorization: {
        id: 'errorAuthorization',
        component: <ErrorAuthorization />,
        title: 'sign-up.oops',
        type: 'default',
    },
    createAccount: {
        id: 'createAccount',
        component: <CreateAccount />,
        title: 'sign-up.create-account',
        type: 'default',
    },
    generateHash: {
        id: 'generateHash',
        component: <GenerateHash />,
        title: 'sign-up.generate-hash-code',
        type: 'default',
    },
    verifyHash: {
        id: 'verifyHash',
        component: <Verify />,
        title: 'sign-up.verify-hash-code',
        type: 'default',
    },
    verifyError: {
        id: 'verifyError',
        component: <ErrorVerify />,
        title: 'sign-up.oops',
        type: 'default',
    },
    forgotPassword: {
        id: 'forgotPassword',
        component: <ForgotPassword />,
        title: 'authorization.forgot-password',
        type: 'default',
    },
    resetPassword: {
        id: 'resetPassword',
        component: <ResetPassword />,
        title: 'authorization.reset-password',
        type: 'default',
    },
    changePassword: {
        id: 'changePassword',
        component: <ChangePassword />,
        title: 'authorization.change-password',
        type: 'default',
    },
    passwordUpdated: {
        id: 'passwordUpdated',
        component: <PasswordUpdated />,
        title: 'authorization.password-updated',
        type: 'default',
    },
    passwordUpdatedError: {
        id: 'passwordUpdatedError',
        component: <PasswordUpdatedError />,
        title: 'sign-up.oops',
        type: 'default',
    },
    updatePasswordError: {
        id: 'updatePasswordError',
        component: <UpdatePasswordError />,
        title: 'sign-up.oops',
        type: 'default',
    },
    resetWithoutKey: {
        id: 'resetWithoutKey',
        component: <ResetWithoutKey />,
        title: 'authorization.reset-password',
        type: 'default',
    },
    changePasswordWithHash: {
        id: 'changePasswordWithHash',
        component: <ChangePasswordWithHash />,
        title: 'authorization.change-password',
        type: 'default',
    },
    login: {
        id: 'logIn',
        component: <LoginForm hideSignUpButton={process.env.REACT_APP_HIDE_SIGN_UP_BUTTON === 'true'} />,
        title: 'authorization.login',
        type: 'default',
    },
};

const useStyles = makeStyles((theme) => ({
    dialogPaperWidthSm: {
        maxWidth: '648px',
    },
    dialogPaperRoot: {
        '& .MuiDialogContent-root': {
            [theme.breakpoints.down('sm')]: {
                padding: '24px 12px',
            },
        },
    },
}));

const _GenericAuthorizationDialog = observer(({ fullScreen }) => {
    const {
        genericAuthorizationDialogOpen,
        setGenericAuthorizationDialogOpen,
        genericAuthorizationDialogType,
    } = useStore().genericAuthorizationDialog;
    const { l } = useLocalization();

    const classes = useStyles();

    return (
        <Dialog
            open={genericAuthorizationDialogOpen}
            onClose={() => setGenericAuthorizationDialogOpen(false)}
            fullScreen={fullScreen}
            fullWidth
            scroll="body"
            classes={{ paperWidthSm: classes.dialogPaperWidthSm, root: classes.dialogPaperRoot }}
        >
            <CustomDialogTitle
                title={l(dialogType[genericAuthorizationDialogType].title)}
                setLoginDialogOpen={setGenericAuthorizationDialogOpen}
                type={dialogType[genericAuthorizationDialogType].type}
            />
            {dialogType[genericAuthorizationDialogType].component}
        </Dialog>
    );
});

export const GenericAuthorizationDialog = withMobileDialog()(_GenericAuthorizationDialog);
