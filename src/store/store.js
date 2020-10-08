import Web3 from 'web3';
import {
    AuthorizationStore,
    LoginStore,
    GenericAuthorizationDialogStore,
    GenerateWalletStore,
    SignUpStore,
    GenerateHashStore,
    VerifyHashStore,
    PasswordChangeStore,
} from '../Authorization/stores';
import {
    CreateStatusStore,
    StatusBtfsInfoStore,
    StatusesListStore,
    StatusPageStore,
    TimelinesSwitcherStore,
    UploadMediaAttachmentsStore,
} from '../Status/stores';
import {
    UpdateUserProfileStore,
    UploadUserAvatarStore,
    UserFollowersStore,
    UserFollowingStore,
    UserCommunitiesStore,
    UserProfileStore,
} from '../User/stores';
import {
    FollowActionStore,
    FollowPeopleStore,
    WhoToFollowStore,
} from '../Follow/stores';
import { DrawerStore } from '../AppBar/stores';
import { LocaleStore } from '../localization/stores';
import { ExplorerStore } from '../Explorer/stores';
import { NotificationsStore } from '../Notification/stores';
import { TopicStatusesStore, TopicsPopularStore } from '../Topics/stores';
import { SearchUsersStore } from '../Search/stores';
import { 
    MemezatorActionsStore, 
    MemezatorStatusesStore, 
    MemezatorWinnersStore, 
    MemezatorDialogStore ,
    MemezatorVotingPowerStore
} from '../Memezator/stores';
import { CommunitiesStore, CommunityStore } from '../Community/stores';
import { TransactionsStore } from '../Transactions/stores';
import { WebsocketStore } from '../websocket/stores';

const uploadMediaAttachments = new UploadMediaAttachmentsStore();
const memezatorDialog = new MemezatorDialogStore();
const createStatus = new CreateStatusStore(uploadMediaAttachments, memezatorDialog);
const authorization = new AuthorizationStore(createStatus);
const globalTimeline = new StatusesListStore(authorization, createStatus, memezatorDialog, '/api/v1/timelines/global', false, true);
const userStatuses = new StatusesListStore(authorization, createStatus);
const userFollowers = new UserFollowersStore();
const userFollowing = new UserFollowingStore();
const userCommunities = new UserCommunitiesStore();
const userProfileTimeline = new StatusesListStore(authorization, createStatus, memezatorDialog, undefined, false, false, true);
const userProfile = new UserProfileStore(authorization, userProfileTimeline, userFollowers, userFollowing, createStatus);
const followAction = new FollowActionStore(authorization);
const followPeople = new FollowPeopleStore(authorization);
const whoToFollow = new WhoToFollowStore(authorization);
const homeTimeline = new StatusesListStore(authorization, createStatus, memezatorDialog, '/api/v1/timelines/home');
const timelineSwitcher = new TimelinesSwitcherStore(globalTimeline, homeTimeline, authorization);
const drawer = new DrawerStore();
const statusPage = new StatusPageStore(authorization, createStatus, memezatorDialog);
const localization = new LocaleStore(authorization);
const explorer = new ExplorerStore();
const statusBtfsInfo = new StatusBtfsInfoStore();
const statusComments = new StatusesListStore(authorization, createStatus, memezatorDialog, undefined, true);
const userAvatarUpload = new UploadUserAvatarStore();
const userProfileUpdate = new UpdateUserProfileStore(authorization, userAvatarUpload, userProfile, localization);
const notifications = new NotificationsStore(authorization);
const topicStatuses = new TopicStatusesStore(authorization, memezatorDialog);
const topicsPopular = new TopicsPopularStore(authorization);
const websocket = new WebsocketStore(authorization, notifications);
const genericAuthorizationDialog = new GenericAuthorizationDialogStore();
const login = new LoginStore(authorization, genericAuthorizationDialog);
const walletGeneration = new GenerateWalletStore(genericAuthorizationDialog);
const signUp = new SignUpStore(walletGeneration, genericAuthorizationDialog, localization);
const hashGeneration = new GenerateHashStore();
const hashVerification = new VerifyHashStore(genericAuthorizationDialog);
const passwordChange = new PasswordChangeStore(new Web3(), genericAuthorizationDialog);
const searchUsers = new SearchUsersStore();
const memezatorActions = new MemezatorActionsStore(authorization, createStatus);
const memezatorStatuses = new MemezatorStatusesStore(authorization, createStatus, memezatorDialog);
const memezatorWinners = new MemezatorWinnersStore();
const memezatorVotingPower = new MemezatorVotingPowerStore();
const communities = new CommunitiesStore();
const community = new CommunityStore();
const transactions = new TransactionsStore(authorization);

export const store = {
    authorization,
    login,
    globalTimeline,
    userStatuses,
    userFollowers,
    userFollowing,
    userCommunities,
    userProfile,
    followAction,
    followPeople,
    whoToFollow,
    createStatus,
    userProfileTimeline,
    signUp,
    homeTimeline,
    timelineSwitcher,
    drawer,
    statusPage,
    uploadMediaAttachments,
    localization,
    explorer,
    statusBtfsInfo,
    statusComments,
    userAvatarUpload,
    userProfileUpdate,
    notifications,
    topicStatuses,
    topicsPopular,
    websocket,
    genericAuthorizationDialog,
    walletGeneration,
    hashGeneration,
    hashVerification,
    passwordChange,
    searchUsers,
    memezatorActions,
    memezatorStatuses,
    memezatorWinners,
    memezatorDialog,
    memezatorVotingPower,
    communities,
    community,
    transactions
};
