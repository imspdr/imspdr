import React, { useState } from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiClock, HiStar } from 'react-icons/hi';
import { Typography } from '@imspdr/ui';
import { StockMiniCard } from './StockMiniCard';
import {
  EmptyMessage,
  FoldButton,
  SectionTitle,
  SidebarContainer,
  SidebarContent,
  SidebarMain,
  SidebarSection,
  TabBar,
  TabButton,
} from './styled';

interface SidebarProps {
  starredStocks: any[];
  recentlyViewedStocks: any[];
  onStockClick: (code: string) => void;
  onToggleStar: (code: string) => void;
  isStarred: (code: string) => boolean;
  isFolded: boolean;
  onToggleFold: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  starredStocks,
  recentlyViewedStocks,
  onStockClick,
  onToggleStar,
  isStarred,
  isFolded,
  onToggleFold,
}) => {
  const [activeTab, setActiveTab] = useState<'starred' | 'recent'>('recent');

  const renderStockList = (stocks: any[]) => {
    return stocks.map((stock) => (
      <StockMiniCard
        key={stock.code}
        name={stock.name}
        code={stock.code}
        price={stock.today}
        change={stock.today - stock.last}
        changePercent={((stock.today - stock.last) / stock.last) * 100}
        to_buy={stock.to_buy}
        isStarred={isStarred(stock.code)}
        onToggleStar={() => onToggleStar(stock.code)}
        onClick={() => onStockClick(stock.code)}
        isFolded={isFolded}
      />
    ));
  };

  const currentStocks = activeTab === 'starred' ? starredStocks : recentlyViewedStocks;
  const tabLabel = activeTab === 'starred' ? '관심 종목' : '최근 본 종목';
  const tabIcon = activeTab === 'starred' ? <HiStar /> : <HiClock />;

  return (
    <SidebarContainer isFolded={isFolded}>
      {!isFolded && (
        <SidebarMain isFolded={isFolded}>
          <SidebarContent>
            <SidebarSection>
              <SectionTitle>
                <Typography
                  variant="title"
                  level={3}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {tabIcon} {tabLabel}
                </Typography>
              </SectionTitle>
              {currentStocks.length === 0 ? (
                <EmptyMessage>
                  <Typography variant="body" level={2}>
                    {activeTab === 'starred' ? '관심 종목이 없습니다.' : '최근 본 종목이 없습니다.'}
                  </Typography>
                </EmptyMessage>
              ) : (
                renderStockList(currentStocks)
              )}
            </SidebarSection>
          </SidebarContent>
        </SidebarMain>
      )}

      <TabBar>
        <FoldButton onClick={onToggleFold}>
          {isFolded ? <HiChevronDoubleLeft size={24} /> : <HiChevronDoubleRight size={24} />}
        </FoldButton>

        <TabButton
          isActive={activeTab === 'starred'}
          onClick={() => {
            setActiveTab('starred');
            if (isFolded) onToggleFold();
          }}
          title="관심 종목"
        >
          <HiStar size={24} />
        </TabButton>

        <TabButton
          isActive={activeTab === 'recent'}
          onClick={() => {
            setActiveTab('recent');
            if (isFolded) onToggleFold();
          }}
          title="최근 본 종목"
        >
          <HiClock size={24} />
        </TabButton>
      </TabBar>
    </SidebarContainer>
  );
};
