'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import React from 'react';

const Check = () => {
  return (
    <div>
      <Tabs
        defaultValue='account'
        className='w-[400px]'
        // onValueChange={handleSelectChange}
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger
            value='account'
            // data-state={activeTab === 'account' ? 'active' : 'inactive'}
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value='password'
            // data-state={activeTab === 'password' ? 'active' : 'inactive'}
          >
            Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value='account'>
          <h1>helosdfsdfsdo</h1>
        </TabsContent>
        <TabsContent value='password'>
          <h1>heloo</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Check;
