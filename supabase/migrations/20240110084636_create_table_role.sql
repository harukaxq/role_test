create role staff;
insert into storage.buckets
  (id, name)
values
  ('public', 'public');

create policy "test_select" 
on storage.objects
for select                              
to anon, authenticated, staff                  
using ( true );   

create policy "test_insert"
ON storage.objects
for insert 
to anon, authenticated,staff                  
with check (
  true
);


grant select,insert on storage.objects to staff;
GRANT staff TO authenticator;