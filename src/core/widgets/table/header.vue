<template>
  <div>
    <div class="card-header header-elements-inline">
      <h5 class="card-title">Basic responsive table</h5>
      <div class="header-elements">
        <div class="list-icons">
          <a class="list-icons-item" data-action="collapse"></a>
          <a class="list-icons-item" data-action="reload"></a>
          <a class="list-icons-item" data-action="remove"></a>
        </div>
      </div>
    </div>

    <div class="card-body">
      Example of a basic <code>responsive</code> table. Create responsive tables
      by wrapping any <code>.table</code> in <code>.table-responsive</code> to
      make them scroll horizontally on small devices (under 768px). When viewing
      on anything larger than 768px wide, you will not see any difference in
      these tables.
    </div>
  </div>
</template>

<script>
export default {
  name: 'WidgetTableHeader'
}
</script>
