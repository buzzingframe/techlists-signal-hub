
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export const mockDataService = {
  async createMockProducts(): Promise<void> {
    const mockProducts = [
      {
        id: 'prod-1',
        name: 'MetaMask',
        category: 'Wallet',
        logo: '🦊',
        price: 'Free',
        description: 'A crypto wallet & gateway to blockchain apps',
        website: 'https://metamask.io',
        editorial_summary: 'The most popular Ethereum wallet for beginners and pros alike',
        use_case: ['Individual Users', 'Developers'],
        badges: ['Browser Extension', 'Mobile App', 'Hardware Wallet Support'],
        signal_score: 8.5,
        reviewer_persona: 'Verified User',
        features: [{"title": "Browser Extension", "icon": "🌐", "description": "Easy-to-use browser extension for Chrome, Firefox, and more"}],
        pricing: {"free": {"name": "Free", "price": "$0", "features": ["Basic wallet functionality", "DApp browser", "Token swapping"]}, "pro": {"name": "MetaMask Institutional", "price": "Custom", "features": ["Advanced custody", "Compliance tools", "Multi-sig support"]}},
        media: [{"type": "image", "url": "https://via.placeholder.com/800x500", "caption": "MetaMask Interface"}]
      },
      {
        id: 'prod-2',
        name: 'Uniswap',
        category: 'DEX',
        logo: '🦄',
        price: 'Free',
        description: 'Decentralized trading protocol',
        website: 'https://uniswap.org',
        editorial_summary: 'Leading decentralized exchange for token swapping',
        use_case: ['Traders', 'Liquidity Providers'],
        badges: ['Decentralized', 'AMM', 'Governance Token'],
        signal_score: 9.2,
        reviewer_persona: 'DeFi Expert',
        features: [{"title": "Automated Market Maker", "icon": "⚡", "description": "Trade tokens directly from your wallet"}],
        pricing: {"free": {"name": "Free Trading", "price": "0.3% fee", "features": ["Token swapping", "Liquidity provision", "Governance voting"]}},
        media: [{"type": "image", "url": "https://via.placeholder.com/800x500", "caption": "Uniswap Trading Interface"}]
      },
      {
        id: 'prod-3',
        name: 'OpenSea',
        category: 'NFT Marketplace',
        logo: '🌊',
        price: 'Free',
        description: 'The largest NFT marketplace',
        website: 'https://opensea.io',
        editorial_summary: 'Go-to platform for buying and selling NFTs',
        use_case: ['Collectors', 'Artists', 'Traders'],
        badges: ['NFTs', 'Marketplace', 'Polygon Support'],
        signal_score: 8.1,
        reviewer_persona: 'NFT Collector',
        features: [{"title": "NFT Trading", "icon": "🎨", "description": "Buy, sell, and discover unique digital assets"}],
        pricing: {"free": {"name": "Trading", "price": "2.5% fee", "features": ["NFT trading", "Collection creation", "Auction support"]}},
        media: [{"type": "image", "url": "https://via.placeholder.com/800x500", "caption": "OpenSea Marketplace"}]
      },
      {
        id: 'prod-4',
        name: 'Chainlink',
        category: 'Oracle',
        logo: '🔗',
        price: 'Variable',
        description: 'Decentralized oracle network',
        website: 'https://chain.link',
        editorial_summary: 'Essential infrastructure for connecting blockchains to real-world data',
        use_case: ['Developers', 'DeFi Protocols'],
        badges: ['Oracles', 'Data Feeds', 'VRF'],
        signal_score: 9.0,
        reviewer_persona: 'Protocol Developer',
        features: [{"title": "Price Feeds", "icon": "📊", "description": "Reliable price data for DeFi applications"}],
        pricing: {"usage": {"name": "Pay per use", "price": "Variable", "features": ["Price feeds", "VRF", "API calls"]}},
        media: [{"type": "image", "url": "https://via.placeholder.com/800x500", "caption": "Chainlink Network"}]
      },
      {
        id: 'prod-5',
        name: 'Aave',
        category: 'Lending',
        logo: '👻',
        price: 'Free',
        description: 'Decentralized lending protocol',
        website: 'https://aave.com',
        editorial_summary: 'Leading DeFi lending platform with innovative features',
        use_case: ['Lenders', 'Borrowers', 'Yield Farmers'],
        badges: ['Lending', 'Flash Loans', 'Governance'],
        signal_score: 8.8,
        reviewer_persona: 'DeFi User',
        features: [{"title": "Flash Loans", "icon": "⚡", "description": "Uncollateralized loans for advanced strategies"}],
        pricing: {"free": {"name": "Lending/Borrowing", "price": "Variable APY", "features": ["Lending", "Borrowing", "Flash loans", "Governance"]}},
        media: [{"type": "image", "url": "https://via.placeholder.com/800x500", "caption": "Aave Protocol Interface"}]
      },
      {
        id: 'prod-6',
        name: 'Compound',
        category: 'Lending',
        logo: '🏦',
        price: 'Free',
        description: 'Algorithmic money market protocol',
        website: 'https://compound.finance',
        editorial_summary: 'Pioneer in DeFi lending with algorithmic interest rates',
        use_case: ['Yield Farmers', 'Developers'],
        badges: ['Algorithmic', 'COMP Token', 'Money Market'],
        signal_score: 8.3,
        reviewer_persona: 'DeFi Researcher',
        features: [{"title": "Algorithmic Rates", "icon": "📈", "description": "Interest rates determined by supply and demand"}],
        pricing: {"free": {"name": "Money Market", "price": "Variable APY", "features": ["Lending", "Borrowing", "COMP rewards"]}},
        media: [{"type": "image", "url": "https://via.placeholder.com/800x500", "caption": "Compound Finance"}]
      }
    ];

    for (const product of mockProducts) {
      const { error } = await supabase
        .from('products')
        .upsert(product, { onConflict: 'id' });
      
      if (error) {
        console.error('Error inserting product:', error);
      }
    }
  },

  async createMockCuratedLists(): Promise<void> {
    // First, let's get the current authenticated user ID
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      console.error('No authenticated user found');
      return;
    }

    const mockLists = [
      {
        id: 'list-1',
        title: 'Essential DeFi Stack 2024',
        description: 'Must-have DeFi protocols for beginners and professionals',
        created_by: userId,
        is_pinned: true,
        cover_image: 'https://via.placeholder.com/800x400',
        tags: ['DeFi', 'Lending', 'DEX']
      },
      {
        id: 'list-2',
        title: 'NFT Creator Toolkit',
        description: 'Everything you need to create, mint, and sell NFTs',
        created_by: userId,
        is_pinned: true,
        cover_image: 'https://via.placeholder.com/800x400',
        tags: ['NFTs', 'Creation', 'Marketplace']
      },
      {
        id: 'list-3',
        title: 'Web3 Developer Tools',
        description: 'Essential tools for building on blockchain',
        created_by: userId,
        is_pinned: false,
        tags: ['Development', 'Tools', 'Infrastructure']
      }
    ];

    for (const list of mockLists) {
      const { error } = await supabase
        .from('curated_lists')
        .upsert(list, { onConflict: 'id' });
      
      if (error) {
        console.error('Error inserting curated list:', error);
      }
    }

    // Add products to lists
    const listProducts = [
      { list_id: 'list-1', product_id: 'prod-2', position: 1 },
      { list_id: 'list-1', product_id: 'prod-5', position: 2 },
      { list_id: 'list-1', product_id: 'prod-6', position: 3 },
      { list_id: 'list-1', product_id: 'prod-4', position: 4 },
      { list_id: 'list-2', product_id: 'prod-3', position: 1 },
      { list_id: 'list-2', product_id: 'prod-1', position: 2 },
      { list_id: 'list-3', product_id: 'prod-4', position: 1 },
      { list_id: 'list-3', product_id: 'prod-1', position: 2 }
    ];

    for (const listProduct of listProducts) {
      const { error } = await supabase
        .from('curated_list_products')
        .upsert(listProduct);
      
      if (error) {
        console.error('Error inserting list product:', error);
      }
    }
  },

  async createMockReviews(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id;

    if (!userId) {
      console.error('No authenticated user found');
      return;
    }

    const mockReviews = [
      {
        id: 'rev-1',
        product_id: 'prod-1',
        user_id: userId,
        pros: 'Easy to use, great browser integration',
        cons: 'Can be confusing for beginners',
        verdict: 'Great wallet for everyday use',
        score: 8,
        reviewer_type: 'web3_developer',
        status: 'active'
      },
      {
        id: 'rev-2',
        product_id: 'prod-2',
        user_id: userId,
        pros: 'Best liquidity, low slippage',
        cons: 'High gas fees during network congestion',
        verdict: 'The gold standard for DEX trading',
        score: 9,
        reviewer_type: 'power_user',
        status: 'active'
      },
      {
        id: 'rev-3',
        product_id: 'prod-3',
        user_id: userId,
        pros: 'Huge selection of NFTs',
        cons: 'High fees, interface can be overwhelming',
        verdict: 'Good for discovering new projects',
        score: 7,
        reviewer_type: 'casual_user',
        status: 'active'
      },
      {
        id: 'rev-4',
        product_id: 'prod-1',
        user_id: userId,
        pros: 'This wallet is spam and terrible',
        cons: 'Everything is bad',
        verdict: 'Worst wallet ever',
        score: 1,
        reviewer_type: 'casual_user',
        status: 'needs_moderation',
        flag_reason: 'spam',
        flagged_at: new Date().toISOString()
      },
      {
        id: 'rev-5',
        product_id: 'prod-2',
        user_id: userId,
        pros: 'Uniswap is not actually decentralized',
        cons: 'False claims about decentralization',
        verdict: 'Misleading marketing',
        score: 3,
        reviewer_type: 'power_user',
        status: 'needs_moderation',
        flag_reason: 'false_information',
        flagged_at: new Date().toISOString()
      }
    ];

    for (const review of mockReviews) {
      const { error } = await supabase
        .from('reviews')
        .upsert(review, { onConflict: 'id' });
      
      if (error) {
        console.error('Error inserting review:', error);
      }
    }
  },

  async setupMockData(): Promise<void> {
    console.log('Setting up mock data...');
    await this.createMockProducts();
    await this.createMockCuratedLists();
    await this.createMockReviews();
    console.log('Mock data setup complete!');
  }
};
