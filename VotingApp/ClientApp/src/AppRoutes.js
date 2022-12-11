import { LoginPage } from "./components/LoginPage/LoginPage";
import { Home } from "./components/Home";
import  RegistrationPage  from "./components/RegistrationPage/RegistrationPage";
import { VotingMenu } from "./components/VotingMenu/VotingMenu";
import VoteBallot from "./components/VoteBallot/VoteBallot";
import SuccesfulVote from "./components/SuccesfulVote/SuccesfulVote";
import ElectionResults from "./components/ElectionResults/ElectionResults";
import VoterSummary from "./components/VoterSummary/VoterSummary";

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
    path: '/voteballot/:id',
    element: <VoteBallot />
  },
  {
    path: '/succesfulvote/:id',
    element: <SuccesfulVote />
  },
  {
    path: '/electionresults/:id',
    element: <ElectionResults />
  },
  {
    path: '/votersummary',
    element: <VoterSummary />
  }
];

export default AppRoutes;
