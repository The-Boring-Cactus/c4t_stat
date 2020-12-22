import * as React from 'react';
import { Nav, INavLink, INavStyles, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';

const navStyles: Partial<INavStyles> = { root: { width: 200, height: 700} };
const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Home',
        url: '#',
        expandAriaLabel: 'Expand Home section',
        collapseAriaLabel: 'Collapse Home section',
        links: [
          {
            name: 'Activity',
            url: '#',
            key: 'key1',
            target: '_blank',
          },
          {
            name: 'MSN',
            url: '#',
            disabled: true,
            key: 'key2',
            target: '_blank',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Documents',
        url: '#',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
      },
      {
        name: 'Pages',
        url: '#',
        key: 'key4',
        target: '_blank',
      },
      {
        name: 'Notebook',
        url: '#',
        key: 'key5',
        disabled: true,
      },
      {
        name: 'Communication and Media',
        url: '#',
        key: 'key6',
        target: '_blank',
      },
      {
        name: 'News',
        url: '#',
        icon: 'News',
        key: 'key7',
        target: '_blank',
      },
    ],
  },
];

export const SidebarMenu: React.FunctionComponent = () => {
  return (
    <div className='SidebarMenu'>
    <Nav
      onLinkClick={_onLinkClick}
      selectedKey="key3"
      ariaLabel="Nav basic example"
      styles={navStyles}
      groups={navLinkGroups}
    />
    </div>
  );
};

function _onLinkClick(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) {
  if (item && item.name === 'News') {
    alert('News link clicked');
  }
}
