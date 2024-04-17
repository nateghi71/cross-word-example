<nav class="sidebar sidebar-offcanvas" id="sidebar">
    <div class="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top pe-5">
{{--        <img width="40" height="40" src="...">--}}
        <a class="sidebar-brand brand-logo text-decoration-none text-white" href="#">جدول کلمات</a>
        <a class="sidebar-brand brand-logo-mini text-decoration-none text-white" href="#">جدول کلمات</a>
    </div>
    <ul class="nav">
        <li  class="nav-item profile">
            <div  class="profile-desc">
                @if(\Illuminate\Support\Facades\Auth::check())
                <div class="profile-pic">
                    <div class="count-indicator">
                        <img class="img-xs rounded-circle" src="{{asset('auth/images/pic-4.png')}}" alt="">
                        <span class="count bg-success"></span>
                    </div>
                    <div class="profile-name">
                        <h5 class="mb-0 font-weight-normal">{{auth()->user()->name}}</h5>
                        <span>کاربر</span>
                    </div>
                </div>
                @endif
{{--                <a href="#" id="profile-dropdown" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical"></i></a>--}}
{{--                <div class="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">--}}
{{--                    <a href="..." class="dropdown-item preview-item">--}}
{{--                        <div class="preview-thumbnail">--}}
{{--                            <div class="preview-icon bg-dark rounded-circle">--}}
{{--                                <i class="mdi mdi-settings text-primary"></i>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="preview-item-content">--}}
{{--                            <p class="preview-subject ellipsis mb-1 text-small">ویرایش حساب</p>--}}
{{--                        </div>--}}
{{--                    </a>--}}
{{--                    <div class="dropdown-divider"></div>--}}
{{--                    <a href="..." class="dropdown-item preview-item">--}}
{{--                        <div class="preview-thumbnail">--}}
{{--                            <div class="preview-icon bg-dark rounded-circle">--}}
{{--                                <i class="mdi mdi-onepassword text-info"></i>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="preview-item-content">--}}
{{--                            <p class="preview-subject ellipsis mb-1 text-small">تغییر رمز</p>--}}
{{--                        </div>--}}
{{--                    </a>--}}
{{--                </div>--}}
            </div>
        </li>
        <li class="nav-item nav-category">
            <span class="nav-link">{{$sectionName}}</span>
        </li>
        <li class="nav-item menu-items">
            <a class="nav-link" href="{{route('index')}}">
              <span class="menu-icon">
                <i class="mdi mdi-view-dashboard"></i>
              </span>
                <span class="menu-title pe-2">جدول ها</span>
            </a>
        </li>
        <li class="nav-item menu-items">
            <a class="nav-link" href="{{route('solvers.index')}}">
              <span class="menu-icon">
                <i class="mdi mdi-view-dashboard"></i>
              </span>
                <span class="menu-title pe-2">حل کنندگان جدول ها</span>
            </a>
        </li>
        <li class="nav-item menu-items">
            <a class="nav-link" href="{{route('tables.create')}}">
              <span class="menu-icon">
                <i class="mdi mdi-view-dashboard"></i>
              </span>
                <span class="menu-title pe-2">ایجاد جدول</span>
            </a>
        </li>
        <li class="nav-item menu-items">
            <a class="nav-link" href="{{route('tables.index')}}">
              <span class="menu-icon">
                <i class="mdi mdi-view-dashboard"></i>
              </span>
                <span class="menu-title pe-2">جدول های من</span>
            </a>
        </li>
    </ul>
</nav>
