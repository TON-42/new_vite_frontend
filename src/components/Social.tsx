import React from 'react';
import {
  Banner,
  Button,
  Image,
  Section,
  Snackbar,
} from '@telegram-apps/telegram-ui';
import telegramLogo from '../assets/logo/telegram.png';
import discordLogo from '../assets/logo/discord-logo.png';
import twitterLogo from '../assets/logo/x.png';

const Social: React.FC = () => {
  return (
    <div className=''>
      <h3 className='text-gray-600 bg-gray- text-sm italic'>
        Give us a shoutout and follow us on socials
      </h3>

      {/* Main Content */}
      <div className='flex flex-col items-center justify-center border-2 border-white space-y-4 p-4 w-full'>
        <Banner
          before={<Image src={telegramLogo} size={48} />}
          header='Join the official channel'
          onCloseIcon={() => {}}
          subheader='Stay updated with our latest news'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() => window.open('https://t.me/ChatPayApp', '_blank')}
            >
              Join Now
            </Button>
          </React.Fragment>
        </Banner>
        <Banner
          before={<Image src={telegramLogo} size={48} />}
          header='Join the Telegram group'
          onCloseIcon={() => {}}
          subheader='Stay updated with our latest news'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() => window.open('https://t.me/ChatPayApp', '_blank')}
            >
              Join Now
            </Button>
          </React.Fragment>
        </Banner>
        <Banner
          before={<Image src={discordLogo} size={48} />}
          header='Join us on Discord'
          onCloseIcon={() => {}}
          subheader='Engage with our community'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() =>
                window.open('https://discord.gg/y4Sg3MaGCt', '_blank')
              }
            >
              Join Now
            </Button>
          </React.Fragment>
        </Banner>
        <Banner
          before={<Image src={twitterLogo} size={48} />}
          header='Follow us on X (Twitter)'
          onCloseIcon={() => {}}
          subheader='Get the latest updates'
          type='section'
        >
          <React.Fragment key='.0'>
            <Button
              size='s'
              onClick={() =>
                window.open('https://x.com/ChatPay82317', '_blank')
              }
            >
              Follow
            </Button>
          </React.Fragment>
        </Banner>
        {/* <>
          <Snackbar message="Copied to clipboard" type="success" />
        </> */}
      </div>

      {/* Footer Section */}
      <Section.Footer>
        Checkout our Zealy campaign for some alpha
      </Section.Footer>
    </div>
  );
};

export default Social;
