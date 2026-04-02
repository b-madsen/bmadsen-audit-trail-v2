import { Headline, BodyText, Button as FabricButton, IconV2 } from '@bamboohr/fabric';
import { Avatar, Gridlet } from '../../components';
import avatarLarge from '../../assets/images/avatar-large.png';
import './Home.css';

// Mock user data
const user = {
  name: 'Jess',
  title: 'Director, Demand Generation',
  department: 'Marketing',
  avatar: avatarLarge,
};

export function Home() {
  return (
    <div className="home-page">
      {/* Profile Header */}
      <div className="home-profile-header">
        <div className="home-profile-info">
          <Avatar src={user.avatar} size="large" />
          <div className="home-profile-text">
            {/* Back link */}
            <button className="home-back-link">
              <IconV2 name="chevron-left-solid" size={16} color="neutral-medium" />
              <BodyText size="medium" color="neutral-weak">Back</BodyText>
            </button>
            <Headline size="large" color="primary">
              {`Hi, ${user.name}`}
            </Headline>
            <p className="home-profile-subtitle">
              {user.title} in {user.department}
            </p>
          </div>
        </div>
        <FabricButton
          variant="outlined"
          color="secondary"
          startIcon={<IconV2 name="grid-2-solid" size={16} />}
        >
          Edit
        </FabricButton>
      </div>

      {/* Gridlet Dashboard */}
      <div className="home-dashboard">
        {/* Row 1 */}
        <Gridlet title="Timesheet" minHeight={302} />
        <div className="home-dashboard-item--span-2-cols home-dashboard-item--span-2-rows">
          <Gridlet title="What's happening at BambooHR" minHeight={684} />
        </div>

        {/* Row 2 */}
        <Gridlet title="Time off" minHeight={350} />

        {/* Row 3 */}
        <Gridlet title="Welcome to BambooHR" minHeight={332} />
        <Gridlet title="Celebrations" minHeight={332} />
        <Gridlet title="Who's out" minHeight={332} />

        {/* Row 4 */}
        <Gridlet title="Starting soon" minHeight={332} />
        <Gridlet title="Company links" minHeight={332} />
        <Gridlet title="Gender breakdown" minHeight={332} />
      </div>
    </div>
  );
}

export default Home;
