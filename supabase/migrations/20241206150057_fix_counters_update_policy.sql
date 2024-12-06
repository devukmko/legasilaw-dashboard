drop policy "Public can increase existing counters" on counters;

create policy "Public can increase existing counters" on counters for update to anon
  using (true)
  with check (true);
