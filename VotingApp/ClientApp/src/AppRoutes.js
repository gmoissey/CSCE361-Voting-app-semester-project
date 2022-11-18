import { LoginPage } from "./components/LoginPage/LoginPage";
import { Home } from "./components/Home";
import { RegistrationPage } from "./components/RegistrationPage/RegistrationPage";
import { VotingMenu } from "./components/VotingMenu/VotingMenu";
import { VoteBallot } from "./components/VoteBallot/VoteBallot";
import { SuccesfulVote } from "./components/SuccesfulVote/SuccesfulVote";
import { ElectionResults } from "./components/ElectionResults/ElectionResults";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegistrationPage />
  },
  {
    path: '/votingmenu',
    element: <VotingMenu />
  },
  {
    path: '/voteballot',
    element: <VoteBallot />
  },
  {
    path: '/succesfulvote',
    element: <SuccesfulVote />
  },
  {
    path: '/electionresutls',
    element: <ElectionResults />
  }
];

export default AppRoutes;
