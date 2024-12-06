drop policy "Auth users can see counters" on counters;

create policy "Public and Auth users can see counters" on counters for
select
  to anon, authenticated
  using (true);
