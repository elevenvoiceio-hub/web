import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideAudioLines, lucideMenu } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-side-bar-desktop',
  imports: [HlmSidebarImports,
    NgIcon,
    HlmIcon,
    HlmDropdownMenuImports,
    HlmAvatarImports],
  templateUrl: './side-bar-desktop.html',
  styleUrl: './side-bar-desktop.css',
  viewProviders: [provideIcons({lucideAudioLines, lucideMenu})]
})
export class SideBarDesktop {
  protected readonly _items = {
		user: {
			name: 'spartan',
			email: 'me@spartan.ng',
			avatar: '/assets/avatar.png',
		},
		navMain: [
			{
				title: 'Dashboard',
				url: '#',
				icon: 'tablerDashboard',
			},
			{
				title: 'Lifecycle',
				url: '#',
				icon: 'tablerListDetails',
			},
			{
				title: 'Analytics',
				url: '#',
				icon: 'tablerChartBar',
			},
			{
				title: 'Projects',
				url: '#',
				icon: 'tablerFolder',
			},
			{
				title: 'Team',
				url: '#',
				icon: 'tablerUsers',
			},
		],
		navClouds: [
			{
				title: 'Capture',
				icon: 'tablerCamera',
				isActive: true,
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#',
					},
					{
						title: 'Archived',
						url: '#',
					},
				],
			},
			{
				title: 'Proposal',
				icon: 'tablerFileDescription',
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#',
					},
					{
						title: 'Archived',
						url: '#',
					},
				],
			},
			{
				title: 'Prompts',
				icon: 'tablerFileAi',
				url: '#',
				items: [
					{
						title: 'Active Proposals',
						url: '#',
					},
					{
						title: 'Archived',
						url: '#',
					},
				],
			},
		],
		navSecondary: [
			{
				title: 'Settings',
				url: '#',
				icon: 'tablerSettings',
			},
			{
				title: 'Get Help',
				url: '#',
				icon: 'tablerHelp',
			},
			{
				title: 'Search',
				url: '#',
				icon: 'tablerSearch',
			},
		],
		documents: [
			{
				name: 'Data Library',
				url: '#',
				icon: 'tablerDatabase',
			},
			{
				name: 'Reports',
				url: '#',
				icon: 'tablerReport',
			},
			{
				name: 'Word Assistant',
				url: '#',
				icon: 'tablerFileWord',
			},
		],
	};

}
