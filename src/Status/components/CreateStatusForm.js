import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from '@material-ui/core';
import { AttachImageInput } from './AttachImageInput';
import { EmojiInput } from './EmojiInput';
import { EmojiPicker } from './EmojiPicker';
import { EmojiPickerDialog } from './EmojiPickerDialog';
import { CreateStatusFormMediaAttachments } from './CreateStatusFormMediaAttachments';
import { RepostedStatusContent } from './RepostedStatusContent';
import { localized } from '../../localization/components';
import Loader from '../../components/Loader';

const useStyles = makeStyles(theme => ({
    createStatusFormCard: {
        background: theme.palette.border.main,
    },
    remainingCharactersCounter: {
        padding: '7px 10px',
    },
    createStatusButtonWrapper: {
        paddingTop: 15,
    },
    createStatusButton: {
        borderRadius: 30,
        float: 'right',
        width: '114px',
        boxShadow: 'none',
    },
    mediaAttachmentsContainer: {
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    cardActionsStyled: {
        display: 'flex',
        padding: '8px 15px',
    },
    customTextarea: {
        paddingLeft: 12,
        height: '102px',
        width: '95%',
        border: 'none',
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:hover': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
    },
    containerRoot: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexWrap: 'nowrap',
    },
    customTextareaContainer: {
        display: 'flex',
        width: '100%',
        padding: '14px'
    }
}));

const getDisabledLabelForAttachmentsInput = (maxAttachments, l) => {
    const maxAttachmentsString = `${maxAttachments}`;
    const isPlural = maxAttachmentsString.charAt(maxAttachmentsString.length - 1) !== '1';
    const bindings = { limit: 1 };
    const labelKey = isPlural ? 'status.images-attachments-limit.plural' : 'status.images-attachments-limit';

    return l(labelKey, bindings);
};

const _CreateStatusForm = ({
    charactersRemaining,
    submissionError,
    content,
    pending,
    currentUserAvatar,
    setContent,
    createStatus,
    mediaAttachmentsFiles,
    addMediaAttachments,
    removeMediaAttachment,
    uploadedAttachments,
    hideSendButton = false,
    isDialogEmojiPicker = false,
    referredStatus,
    statusReferenceType,
    setReferredStatus,
    setStatusReferenceType,
    setEmojiPickerVisible,
    setEmojiPickerDialogVisible,
    mediaAttachmentUploadPending,
    l,
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.createStatusFormCard} className="create-status-form">
            <Grid container>
                {referredStatus && (
                    <Grid item>
                        <Typography>
                            {statusReferenceType === 'REPOST'
                                ? l('status.reposted-status')
                                : ``}
                        </Typography>
                        <RepostedStatusContent
                            repostedStatus={referredStatus}
                            displayClearButton
                            onClearButtonClick={() => {
                                setReferredStatus(undefined);
                                setStatusReferenceType(undefined);
                            }}
                        />
                    </Grid>
                )}
                <div className={classes.customTextareaContainer}>
                    <Avatar src={currentUserAvatar} className="avatar-mini" />
                    <TextField
                        placeholder={l('status.placeholder')}
                        multiline
                        rows={4}
                        rowsMax={Number.MAX_SAFE_INTEGER}
                        onChange={event => setContent(event.target.value)}
                        fullWidth
                        value={content}
                        className={classes.customTextarea}
                    />
                </div>
            </Grid>
            <CardActions className={classes.cardActionsStyled}>
                <Grid container justify="flex-start">
                    <div className="create-status-form-pic">
                        <AttachImageInput
                            onImagesAttached={addMediaAttachments}
                            disabled={mediaAttachmentsFiles.length === 1}
                            disabledLabel={getDisabledLabelForAttachmentsInput(1, l)}
                        />
                        <img src="/pic-gif-disabled.png" />
                        <img src="/pic-list-disabled.png" />
                        <EmojiInput 
                            setEmojiPickerVisible={setEmojiPickerVisible} 
                            setEmojiPickerDialogVisible={setEmojiPickerDialogVisible} 
                            isDialogEmojiPicker={isDialogEmojiPicker} 
                        />
                    </div>
                </Grid>
                <Grid container classes={{ root: classes.containerRoot }}>
                    <div className={classes.remainingCharactersCounter}>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                        >
                            {charactersRemaining}
                        </Typography>
                    </div>
                    {!hideSendButton && (
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.createStatusButton}
                            onClick={createStatus}
                            disabled={(pending || mediaAttachmentUploadPending) || !(content.length > 0 || uploadedAttachments.length !== 0)}
                        >
                            {pending && <Loader size="md" css={'position:absolute; top: -2px; left: 40px'}/>}
                            {l('status.send')}
                        </Button>
                    )}
                </Grid>
            </CardActions>
            {mediaAttachmentsFiles && mediaAttachmentsFiles.length > 0 && 
                <div className={classes.mediaAttachmentsContainer}>
                    <CreateStatusFormMediaAttachments
                        mediaAttachmentsFiles={mediaAttachmentsFiles}
                        onDelete={removeMediaAttachment}
                        />
                </div>
            }
            {isDialogEmojiPicker ? <EmojiPickerDialog /> : <EmojiPicker />}
        </Card>
    );
};

const mapMobxToProps = ({ createStatus, authorization, uploadMediaAttachments }) => ({
    charactersRemaining: createStatus.charactersRemaining,
    submissionError: createStatus.submissionError,
    content: createStatus.content,
    pending: createStatus.pending,
    mediaAttachmentUploadPending: createStatus.mediaAttachmentUploadPending,
    setEmojiPickerVisible: createStatus.setEmojiPickerVisible,
    setEmojiPickerDialogVisible: createStatus.setEmojiPickerDialogVisible,
    currentUserAvatar: authorization.currentUser
        ? authorization.currentUser.avatar || 'http://localhost:3000/avatars/original/missing.png'
        : 'http://localhost:3000/avatars/original/missing.png',
    setContent: createStatus.setContent,
    createStatus: createStatus.createStatus,
    addMediaAttachments: uploadMediaAttachments.attachFiles,
    removeMediaAttachment: uploadMediaAttachments.removeAttachedFileById,
    mediaAttachmentsFiles: uploadMediaAttachments.mediaAttachmentsFiles,
    uploadedAttachments: createStatus.mediaAttachments,
    referredStatus: createStatus.referredStatus,
    setReferredStatus: createStatus.setReferredStatus,
    statusReferenceType: createStatus.statusReferenceType,
    setStatusReferenceType: createStatus.setStatusReferenceType,
});

export const CreateStatusForm = localized(inject(mapMobxToProps)(observer(_CreateStatusForm)));
